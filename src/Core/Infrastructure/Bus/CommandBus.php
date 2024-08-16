<?php

namespace App\Core\Infrastructure\Bus;

use App\Core\Infrastructure\Interaction\Command\CommandInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Messenger\Stamp\HandledStamp;

readonly class CommandBus implements CommandBusInterface
{
    public function __construct(
        private MessageBusInterface $commandBus,
    ) {
    }

    public function dispatch(CommandInterface $command, ?StampCollection $stamps = null): mixed
    {
        $envelope = $this->commandBus->dispatch($command, is_null($stamps) ? [] : $stamps->toArray());

        return $envelope->last(HandledStamp::class)?->getResult();
    }
}
